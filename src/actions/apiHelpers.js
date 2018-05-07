import parse from "parse-link-header";
import { normalize } from "normalizr/lib/index";
import queryString from "query-string";
import { getJSON } from "redux-api-middleware";

const API_ROOT = "http://localhost:3000/api";

export const getApiFullUrl = endpoint => {
  const isPartialUrl = endpoint.indexOf(API_ROOT) === -1;

  return isPartialUrl ? `${API_ROOT}/${endpoint}` : endpoint;
};

export const stringifyQueryParams = params =>
  Object.keys(params).length ? `?${queryString.stringify(params)}` : "";

export const processBody = bodySchema => (action, state, res) =>
  getJSON(res).then(json => normalize(json, bodySchema));

export const processHeader = (action, state, res) => {
  const link = res.headers.get("Link");

  return {
    nextPageUrl: link ? parse(link).next.url : undefined
  };
};

export const processResponse = (processors = []) => (action, state, res) =>
  processors.reduce((promise, processor) => {
    let payload;

    return promise
      .then(previousPayload => {
        payload = previousPayload;
      })
      .then(() => processor(action, state, res))
      .then(processedData => ({
        ...payload,
        ...processedData
      }));
  }, Promise.resolve({}));
