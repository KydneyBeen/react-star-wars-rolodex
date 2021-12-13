// call app endpoint and return raw response
export function callApi (path:string, callback:Function):void {
  const request:XMLHttpRequest = new XMLHttpRequest();
  request.addEventListener('load', () => {
      const resultList = request.response;
      callback(resultList);
  })
  request.open('GET', path)
  request.send();
}
