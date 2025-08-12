
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import z from "zod"
import api from "../../../services/api"

const schema = z.object({
  tenPhim : z.string().nonempty("Vui long nhap ten phim"),
  trailer: z.string().nonempty("Vui long nhap thong tin").regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/gi , "Vui long nhap dung dinh dang url"),
  moTa: z.string().nonempty("Vui long nhap thong tin").max(100, "Noi dung khong duoc vuot qua 200 ky tu"),
  ngayKhoiChieu: z.string().nonempty("Vui long nhap thong tin"),
  trangThai: z.string().optional(),
  Hot:  z.boolean().optional(),
  maNhom: z.string().optional("GP01"),
  danhGia: z.string().regex(/^([0-9]|10)$/gm , "Vui long nhap tu 0 den 10"),
  hinhAnh: z.any()
})

export default function AddMovie() {


  const { register, setValue, handleSubmit, watch , formState } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      trangThai: false,
      // SapChieu: false,
      // DangChieu: false,
      Hot: false,
      danhGia: "",
      hinhAnh: null
    },
    resolver: zodResolver(schema)
  })

  const errors = formState.errors 
  console.log('🔥 ~ AddMovie ~ errors:', errors)


  const hinhAnh = watch("hinhAnh")

  const previewImage = (file) => {
    if (!file) return ""
    const url = URL.createObjectURL(file)
    return url
  }

  const onSubmit = async (values) => {

    const { trangThai ,  Hot,...rest }= values
    const newValues = {...rest , SapChieu: trangThai === "false" , DangChieu:  trangThai === "true" , Hot: Hot === "true"}

    const formData = new FormData();

    formData.append("tenPhim" , newValues.tenPhim)
    formData.append("trailer" , newValues.trailer)
    formData.append("moTa" , newValues.moTa)
    formData.append("danhGia" , newValues.danhGia)
    formData.append("SapChieu" , newValues.SapChieu)
    formData.append("DangChieu" , newValues.DangChieu)
    formData.append("ngayKhoiChieu" , format(newValues.ngayKhoiChieu , "dd/MM/yyyy"))
    formData.append("hinhAnh" , newValues.hinhAnh)
    formData.append("maNhom" , newValues.maNhom)
    
    try {

      const response = await api.post('/QuanLyPhim/ThemPhimUploadHinh' , formData)
      console.log('🔥 ~ onSubmit ~ response:', response)
      
    } catch (error) {
      console.log("Them phim loi")
    }
  }


  return (
    <div className='space-y-4'>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Admin
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
              </svg>
              <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Movie Management</a>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
              </svg>
              <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add movie</a>
            </div>
          </li>

        </ol>
      </nav>


      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add Movie</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter movie name"   {...register("tenPhim")} />
            {errors?.tenPhim?.message &&  <span className='text-xs text-red-500'>{errors.tenPhim.message}</span>}
           
          </div>

          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descriptions</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter descriptions"  {...register("moTa")} />
            {errors?.moTa?.message &&  <span className='text-xs text-red-500'>{errors.moTa.message}</span>}
          </div>

          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trailer</label>
            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://youtube.com/xxx/yyyy"   {...register("trailer")} />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review</label>
            <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0  - 10"  {...register("danhGia")} />
          </div>

          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release time</label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input datepicker id="default-datepicker" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" {...register("ngayKhoiChieu")} />
            </div>
          </div>

          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <div className='flex items-center gap-3'>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" defaultValue name="trangThai" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("trangThai")} />
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Now showing
                </label>
              </div>
              <div className="flex items-center">
                <input defaultChecked id="default-radio-2" type="radio" defaultValue name="trangThai" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("trangThai")} />
                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Coming soon
                </label>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="hotMovie" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  {...register("Hot")} />
          </div>
          <label htmlFor="hotMovie" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hot movie</label>
        </div>

        <div className="flex items-start mb-6">
          {!hinhAnh && <div className="flex items-center h-5">
            <input id="image" type="file" accept='.png,jpeg,.jpg' onChange={((events) => {
              const hinhAnh = events.target.files[0]
              setValue("hinhAnh", hinhAnh)
            })} />
          </div>}
          {hinhAnh &&
            <div>
              <img src={previewImage(hinhAnh)} className='w-[320px] h-[24rem] object-cover rounded-2xl' />
              <button className='p-2 rounded-lg text-red-500 border border-red-500' onClick={()=> setValue("hinhAnh" , null)}>
                Delete
              </button>
            </div>}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

    </div>
  )
}
