
export function formaterURL(url: string, params?: Record<string, string | number>, query?: Record<string, string | number | boolean>): string {
    if(params){
        Object.keys(params).forEach((key) => {
            url = url.replace(`:${key}`, params[key].toString());
        });
    }
    console.log('from formater url', query);
    if(query){
        const queryString = Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join("&");
        url = `${url}?${queryString}`;
        console.log(url);
    }
    return url
}