export const convertBlobTo64 = (file: Blob): Promise<string | ArrayBuffer> =>
  new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = () => {
      if (fileReader?.result) {
        resolve(fileReader?.result)
      }
    }
  })
