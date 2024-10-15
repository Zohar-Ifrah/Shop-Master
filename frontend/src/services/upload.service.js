export const uploadService = {
  async uploadImg(file) {

    const cloudName = process.env.REACT_APP_CLOUD_NAME
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET

    var uploadUrl
    file.type === 'image/png' ?
      uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      :
      uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`

    try {
      const formData = new FormData()
      formData.append('upload_preset', uploadPreset)
      formData.append('file', file)

      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      })

      const fileUrl = await res.json()
      return fileUrl
    }
    catch (err) {
      console.error('Failed to upload file', err)
      throw err
    }
  }
}