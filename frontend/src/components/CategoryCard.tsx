import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  icon: string;
  link: string;
}

export const CategoryCard = ({ title, icon, link }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <Card className="group cursor-pointer overflow-hidden hover:shadow-medium transition-base border-border/50 bg-card">
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-base">
            <img src={icon} alt={title} className="h-16 w-16 object-contain" />
          </div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-base">
            {title}
          </h3>
        </div>
      </Card>
    </Link>
  );
};
