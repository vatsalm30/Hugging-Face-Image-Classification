import { useState } from "react";
import ImageDisplay from "./ImageDisplay";

const ImageUpload = () => {
    const [image, setImage] = useState<string>("");
    const [imageType, setImageType] = useState<string>("");
    const [candidateLables, setCandidateLables] = useState<string[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    }

    const getImageType =  async () => {
        fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: image, candidateLables: candidateLables.filter((label) => label !== "") }),
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setImageType(data[0].label);
            });
        });
    }

    return (
        <div>
            <input className="image-input" type="file" onChange={handleFileUpload} />
            <br/>
            {candidateLables.map((label, key) => <input key={key} type="text" value={label} style={{margin: "5px"}}
                onChange={(e) => {
                    setCandidateLables(candidateLables.map((l, i) => i === candidateLables.indexOf(label) ? e.target.value : l));
                    }}/>)}
            <button onClick={() => setCandidateLables([...candidateLables, ""])}>Add Label</button>
            <button onClick={() => setCandidateLables(candidateLables.filter((_,key) => key !== candidateLables.length - 1))}>Remove Label</button>
            <br/>
            <button onClick={getImageType}>Get Image Type</button>
            <br/>
            <h3>{imageType}</h3>
            <ImageDisplay image={image} />
        </div>
    );
}

export default ImageUpload;