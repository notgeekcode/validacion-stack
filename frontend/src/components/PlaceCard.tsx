/*import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlaceCardProps {
  id: string;
  name: string;
  category: string;
  location?: string;
  zone?: string;
  rating: number;
  image?: string;
  images?: string[];
}

export const PlaceCard = ({ id, name, category, location, zone, rating, image, images }: PlaceCardProps) => {
  const displayLocation = location || zone || "";
  const displayImage = image || images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";
  return (
    <Link to={`/lugar/${id}`}>
      <Card className="group overflow-hidden hover:shadow-medium transition-base border-border/50">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-slow"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-base line-clamp-1">
              {name}
            </h3>
            <Badge variant="secondary" className="shrink-0">
              {category}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{displayLocation}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};*/

import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  subtitle?: string;
  badge?: string;
};

export default function PlaceCard({ title, imageUrl, subtitle, badge }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-white shadow-soft transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-soft will-change-transform group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
    </article>
  );
}
