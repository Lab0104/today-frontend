declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const Geocoder = (address: string) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const lon = result[0].x;
        const lat = result[0].y;
        resolve({ lon, lat });
      } else {
        reject(status);
      }
    };

    geocoder.addressSearch(address, callback);
  });
};
