import Config from "../config";
import { logout } from "../redux/actions/userActions";
import store from "../redux/store";

const getHeaders = () => {
  let headers: any = {
    "Content-Type": "application/json"
  };
  let token = store.getState().userReducer.token;
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  return headers;
};

export async function get<T>(url: string): Promise<T> {
  return handleResponse(
    fetch(`${Config.apiUrl}/${url}`, {
      headers: getHeaders()
    })
  );
}

export async function post<T>(url: string, model: T): Promise<any> {
  return handleResponse(
    fetch(`${Config.apiUrl}/${url}`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(model)
    })
  );
}

export async function put<T>(url: string, model: T): Promise<any> {
  return handleResponse(
    fetch(`${Config.apiUrl}/${url}`, {
      headers: getHeaders(),
      method: "PUT",
      body: JSON.stringify(model)
    })
  );
}

export async function del<T>(url: string, model: T): Promise<any> {
  return handleResponse(
    fetch(`${Config.apiUrl}/${url}`, {
      headers: getHeaders(),
      method: "DELETE",
      body: JSON.stringify(model)
    })
  );
}

async function handleResponse<T>(promise: Promise<Response>): Promise<T> {
  //todo: add reject
  return promise.then(async (response: Response) => {
    if (response.status === 401) {
      store.dispatch(logout());
      return null;
    } else if (response.status === 204) {
      return null;
    } else {
      return JSON.parse(await response.text());
    }
  });
}
