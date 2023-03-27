export const api = async (url, otherData) => {
  const { body, ...others } = otherData;
  const response = await fetch(url, {
    body: JSON.stringify(body),
    ...others,
  });
  const data = await response.json();
  return { status: response.status, ...data };
};
