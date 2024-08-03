import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

interface CardListProps {
  cards: CardProps[];
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-lg m-4 p-4 w-2/3 md:w-1/3 h-full">
      <div className="flex justify-center">
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="object-cover rounded"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{title}</div>
        <p className="text-gray-700 text-base text-center">{description}</p>
      </div>
    </div>
  );
};

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex w-full flex-col items-center md:items-start  md:flex-row md:justify-center">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardList;
