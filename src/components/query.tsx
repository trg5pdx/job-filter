import { useState, useEffect } from "preact/hooks";
import { Input } from "./textbox";
import { jobBoards, workOptions, Query } from "../utils/query";

const inputFmt = `pt-2 pb-2`;

export default function SearchQuery() {
  /* input fields:
   * general search: textbox
   * pay range: textbox
   * companies (comma seperated list; empty doesnt filter by company): textbox
   * remote/in person/hybrid: checkboxes
   * location: textbox
   * job boards to pull from: checkboxes
   * submit: button
   * reset query: button
   * later: have a reload previous query button?
   * */

  const [search, setSearch] = useState({
    search: "",
    pay_range: "",
    companies: "",
    options: workOptions.Any,
    location: "",
    board: jobBoards.All,
  });

  return (
    <section className="w-full bg-slate-600 pb-5">
      <form className="p-4" onSubmit={(e) => {
        e.preventDefault();
        console.log(search);
      }}>
        <Input
          id="search"
          value={search.search}
          onChange={(val) => {
            setSearch({...search, search: val});
            console.log(search);
          }}
          className={inputFmt}
        />
        <Input
          id="pay_range"
          value={search.pay_range}
          onChange={(val) => {
            setSearch({...search, pay_range: val});
          }}
          className={inputFmt}
        />
        <Input
          id="companies"
          value={search.companies}
          onChange={(val) => {
            setSearch({...search, companies: val});
          }}
          className={inputFmt}
        />
        <Input
          id="location"
          value={search.location}
          onChange={(val) => {
            setSearch({...search, location: val});
          }}
          className={inputFmt}
        />
        <button type="submit">???</button>
      </form>
    </section>
  );
}
