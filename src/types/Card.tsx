import iCardAnomaly from "./interfaces/iCardAnomaly";
import iCardArtifact from "./interfaces/iCardArtifact";
import iCardField from "./interfaces/iCardField";
import iCardGod from "./interfaces/iCardGod";

type Card = iCardAnomaly | iCardArtifact | iCardField | iCardGod;

export default Card;
