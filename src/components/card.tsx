export default function Card(job: Object) {
  console.log(job);
  const name = job.name;
  return (
    <section className="m-5 p-5 dark:bg-slate-900 bg-slate-300 dark:text-white text-black rounded">
      <h2>{name}</h2>
    </section>
  );
}
