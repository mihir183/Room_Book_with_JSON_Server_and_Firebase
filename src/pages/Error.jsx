import img from '../assets/images/error.jpg'

const Error = () => {
  return (
    <>
      <div className='' style={{ backgroundImage: `url(${img})`, backgroundSize: "contain", backgroundPosition: "center", height : '100vh' }}>
        {/* <div className="col-lg-6 mt-5 mx-auto bg-danger p-5"> */}
            {/* <h1 className='text-capitalize text-center'>page not found</h1> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default Error