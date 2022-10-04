import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import { Badge } from "antd";

const ImageUpload = ({ value, setValue, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const imageResizeAndUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    let files = e.target.files;
    let uploadedImages = value.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API_URL}image/upload`,
                { image: uri },
                {
                  headers: {
                    authToken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                uploadedImages.push(res.data);
                setValue({ ...value, images: uploadedImages });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}image/remove`,
        { public_id: id },
        {
          headers: {
            authToken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        const { images } = value;
        let filteredImages = images.filter((item) => item.public_id !== id);
        setValue({ ...value, images: filteredImages });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row mb-2">
        {value.images.map((img) => (
          <Badge
            count="X"
            key={img.public_id}
            onClick={() => handleImageRemove(img.public_id)}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              shape="square"
              className="ml-2"
              src={img.url}
              size={100}
            ></Avatar>
          </Badge>
        ))}
      </div>

      <div className="row">
        <label className="btn btn-primary btn-outline">
          Image Upload
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={imageResizeAndUpload}
          />
        </label>
      </div>
    </>
  );
};

export default ImageUpload;
