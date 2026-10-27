const categories = [
  "Business",
  "Artificial Intelligence",
  "Data Science",
  "Computer Science",
  "Information Technology",
  "Personal Development",
  "Healthcare",
  "Language Learning",
  "Social Sciences",
  "Arts and Humanities",
  "Physical Science and Engineering",
  "Math and Logic",
];

export default function CategoryChips() {
  return (
    <ul className="chip-row list-unstyled mb-0" role="list">
      {categories.map((category) => (
        <li key={category}>
          <span className="chip">{category}</span>
        </li>
      ))}
    </ul>
  );
}
