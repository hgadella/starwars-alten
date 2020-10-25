
export class Ship
{
  shipId?: string;
  name: string;
  url: string;

  public static _id(url): string {

    return url.split('/').filter((item) => {
        return item !== '';
    }).slice(-1)[0];
  }
}
