
const ImageDisplay = ({ image } : { image: string }) => {
  return (
    <div>
        <img src={image}/>
    </div>
  )
}

export default ImageDisplay