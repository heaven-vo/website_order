import { BallTriangle } from "react-loading-icons";
import "./style.css";
function Loading({ isLoading }) {
    return (
        <div className="loading-wrapper container" style={{ display: isLoading ? "flex" : "none" }}>
            <BallTriangle stroke="var(--primary)" />
        </div>
    );
}
export default Loading;
