import MuiCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface CardProps {
  pokemon: any;
  actions?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function Card(props: CardProps) {
  return (
    <MuiCard className="card">
      <CardHeader
        className="card-title"
        title={props.pokemon.name}
        subheader={
          <>
            <span>#{props.pokemon.order.toString().padStart(3, "0")}</span>
            {props.pokemon.types.map((type: string) => (
              <span key={type} className={`type ${type}`}>
                {type}
              </span>
            ))}
          </>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={props.pokemon.imageUrl}
        alt="Paella dish"
      />
      {props.actions && (
        <CardActions className="card-actions">
          <IconButton
            color="secondary"
            onClick={(e) => props.onEdit?.(props.pokemon.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="error"
            onClick={() => props.onDelete?.(props.pokemon.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </MuiCard>
  );
}
