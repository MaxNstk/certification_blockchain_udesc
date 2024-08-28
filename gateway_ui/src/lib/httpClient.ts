
export class HttpClient{

    authToken: string;
    baseUrl: string = "http://localhost:3000/";
    headers: HeadersInit;

    constructor(authToken:string){
      this.authToken = authToken;
      this.headers = {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      };
    };

    async get(endpoint:string): Promise<Response> {
      return await fetch(this.baseUrl+endpoint,{
        method: 'GET',
        headers:this.headers
      });
    };

    async post(endpoint:string, body:BodyInit): Promise<Response>{
      return await fetch(this.baseUrl+endpoint,{
        method: 'POST',
        headers: this.headers,
        body,
      });
    }

    async put(endpoint:string, body:BodyInit): Promise<Response>{
      return await fetch(this.baseUrl+endpoint,{
        method: 'PUT',
        headers: this.headers,
        body,
      });
    }
}