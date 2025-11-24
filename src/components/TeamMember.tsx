interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamMember = ({ name, role, description, image }: TeamMemberProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-accent font-semibold mb-3">{role}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default TeamMember;
