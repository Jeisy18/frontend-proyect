import React from "react";
import { useRouter } from "next/navigation";
import { Users, BarChart, UserCog, Smartphone, Calendar } from "lucide-react";

const icons = {
  employees: Users,
  schedules: Calendar,
  supervisors: UserCog,
  devices: Smartphone,
  stats: BarChart,
};

export default function DashboardTiles({ items }) {
  const router = useRouter();

  return (
    <div className="tiles-wrapper">
      <section className="tiles-grid">
        {items.map((item, i) => {
          const Icon = icons[item.icon] || Users;

          return (
            <article
              key={i}
              className={`tile tile-${i + 1}`}
              onClick={() => router.push(item.href)}
              style={{ cursor: "pointer" }} // opcional si ya lo tienes
            >
              <div className="tile-bg">
                <Icon size={300} strokeWidth={1.5} color="white" />
              </div>

              <div className="tile-overlay" />

              <header className="tile-header">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </header>
            </article>
          );
        })}
      </section>
    </div>
  );
}
