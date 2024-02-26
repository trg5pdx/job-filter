import { useState, useEffect } from "preact/hooks";
import { Input, Checkbox } from "./textbox";
import { jobBoards, workOptions, Query } from "../utils/query";

const inputFmt = `pt-2 pb-2`;
const checkStyle = `pt-2 pb-2`;

export default function SearchQuery(props: {
  query: Query;
  setQuery: (
    search: string,
    pay_range: string,
    pay_min: number,
    pay_max: number,
    companies: string,
    remote: bool,
    inperson: bool,
    hybrid: bool,
    location: string,
    board: [jobBoards]
  ) => void;
}) {
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
    pay_min: "",
    pay_max: "",
    companies: "",
    remote: true,
    hybrid: true,
    inperson: true,
    board_jobicy: true,
    location: "",
    board: [jobBoards.Jobicy],
  });

  return (
    <section className="w-full bg-slate-600 pb-5">
      <form
        className="p-4 grid"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(search);
          props.setQuery(
            search.search,
            search.pay_range,
            search.pay_min,
            search.pay_max,
            search.companies,
            search.remote,
            search.inperson,
            search.hybrid,
            search.location,
            search.board
          );
        }}
      >
        <Input
          id="search"
          value={search.search}
          inputType={"text"}
          onChange={(val) => {
            setSearch({ ...search, search: val });
            console.log(search);
          }}
          className={inputFmt}
        />
        <div>
          <Input
            id="pay_min"
            value={search.pay_min}
            inputType={"number"}
            onChange={(val) => {
              setSearch({ ...search, pay_min: val });
            }}
          />
          <Input
            id="pay_max"
            value={search.pay_max}
            inputType={"number"}
            onChange={(val) => {
              setSearch({ ...search, pay_max: val });
            }}
          />
        </div>
        <Input
          id="companies"
          value={search.companies}
          inputType={"text"}
          onChange={(val) => {
            setSearch({ ...search, companies: val });
          }}
          className={inputFmt}
        />
        <Input
          id="location"
          value={search.location}
          inputType={"text"}
          onChange={(val) => {
            setSearch({ ...search, location: val });
          }}
          className={inputFmt}
        />
        <div>
          <Checkbox
            id="Remote"
            title="Remote"
            value={search.remote}
            onClick={() => {
              setSearch({ ...search, remote: !search.remote });
            }}
            className={checkStyle}
          />
          <Checkbox
            id="Hybrid"
            title="Hybrid"
            value={search.hybrid}
            onClick={() => {
              setSearch({ ...search, hybrid: !search.hybrid });
            }}
            className={checkStyle}
          />
          <Checkbox
            id="Inperson"
            title="Inperson"
            value={search.inperson}
            onClick={() => {
              setSearch({ ...search, inperson: !search.inperson });
            }}
            className={checkStyle}
          />
        </div>
        <div>
          {"Boards to pull from: "}
          <Checkbox
            id="jobicy"
            title="Jobicy"
            value={search.board_jobicy}
            onClick={() => {
              setSearch({ ...search, board_jobicy: !search.board_jobicy });
            }}
            className={checkStyle}
          />
        </div>
        <button type="submit" className="bg-slate-900 rounded-md p-2 mt-2 mb-2">
          Submit Search
        </button>
      </form>
    </section>
  );
}
