import { useState } from "react";
import ImageDisplay from "./ImageDisplay";

const ImageUpload = () => {
    const [image, setImage] = useState<string>("");

  return (
    <div>
        <input type="file" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        setImage(reader.result);
                    }
                }
            }
        }} />
        <ImageDisplay image={image} />
    </div>
  )
}

export default ImageUpload