import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../store/slices/uiSlice";

const BASE_URL = "http://localhost:8080";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const makeRequest = useCallback(
    async (url, options = {}, showGlobalLoading = false) => {
      try {
        setLoading(true);
        setError(null);

        if (showGlobalLoading) {
          dispatch(setGlobalLoading(true));
        }

        // Add authorization header if token exists
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          ...options.headers,
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers,
        });

        // Handle non-200 responses
        if (!response.ok) {
          const errorData =
            (await response.json().catch(() => ({
              message: "Something went wrong",
            }))) || {};
          throw new Error(errorData.message || `HTTP error ${response.status}`);
        }

        // Handle empty responses
        if (response.status === 204) {
          return null;
        }

        const data = await response.json();

        // Auto-store token for login
        if (url.includes("/auth/login") && data?.token) {
          localStorage.setItem("token", data.token);
        }

        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
        if (showGlobalLoading) {
          dispatch(setGlobalLoading(false));
        }
      }
    },
    [dispatch]
  );

  const get = useCallback(
    (url, showGlobalLoading = false) => makeRequest(url, {}, showGlobalLoading),
    [makeRequest]
  );

  const post = useCallback(
    (url, data, showGlobalLoading = false) =>
      makeRequest(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        showGlobalLoading
      ),
    [makeRequest]
  );

  const put = useCallback(
    (url, data, showGlobalLoading = false) =>
      makeRequest(
        url,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        showGlobalLoading
      ),
    [makeRequest]
  );

  const del = useCallback(
    (url, showGlobalLoading = false) =>
      makeRequest(
        url,
        {
          method: "DELETE",
        },
        showGlobalLoading
      ),
    [makeRequest]
  );

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    makeRequest,
  };
};

export default useApi;
