import api from './api'

export const getListMovieApi = async (maNhom, soTrang, soPhanTuTrenTrang) => {
  try {
    const response = await api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`)
    return response.data.content
  } catch (error) {
    console.log('🔥 ~ getListMovieApi ~ error:', error)

  }
}


export const getMovieDetailsApi = async (movieId) => {
  try {
    const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
    return response.data.content
  } catch (error) {
    console.log("⚡️ ~ getMovieDetails ~ error:", error);
  }
};