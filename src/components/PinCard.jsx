import usePins from "../hooks/usepins.js";

export default function PinCard({ pin }) {
  const { savedPinIds, toggleSavePin } = usePins();
  const isSaved = savedPinIds.includes(pin.id);

  return (
    <article className="pin">
      <img
        src={pin.imageUrl || pin.image || "https://placehold.co/300x400?text=Pin"}
        alt={pin.title || "Pinterest pin"}
        className="pin-photo"
      />

      <div className="pin-info">
        <div>
          <h3>{pin.title || "Untitled Pin"}</h3>
          {pin.author && <small>{pin.author}</small>}
        </div>

        <button
          type="button"
          className={isSaved ? "save saved" : "save"}
          onClick={() => toggleSavePin(pin.id)}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}