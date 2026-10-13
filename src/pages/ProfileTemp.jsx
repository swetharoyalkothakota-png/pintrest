
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";
export default function Profile() {
  const { pins, savedPinIds } = useAppContext();

  return (
    <main className="page-container">
      <section className="home-heading">
        <div className="profile-avatar">S</div>
        <h1>My Profile</h1>
        <p>Welcome to your Pinterest collection!</p>

        <div className="profile-stats">
          <div>
            <strong>{pins.length}</strong>
            <p>Total Pins</p>
          </div>
          <div>
            <strong>{savedPinIds.length}</strong>
            <p>Saved Ideas</p>
          </div>
        </div>
      </section>

      <h2>Discover Your Pins</h2>
      <PinGrid pins={pins} />
    </main>
  );
}
