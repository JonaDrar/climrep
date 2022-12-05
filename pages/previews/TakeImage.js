import { ImageTaker } from "../../components/ImageTaker";

export default function TakeImage () {
  return (
    <div>
      <h1>Take Image</h1>
      <ImageTaker />

      <input type="file" name="camera" accept="image/*" capture="environment" />
    </div>
  )
}
