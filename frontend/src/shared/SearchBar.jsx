import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import BASE_URL from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const cityRef = useRef("");
  const countryRef = useRef(0);
  const maxPeopleRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const city = cityRef.current.value;
    const country = countryRef.current.value;
    const maxPeople = maxPeopleRef.current.value;

    if (city === "" || country === "" || maxPeople === "") {
      return alert("All fields are required");
    }

    const res = await fetch(
      `${BASE_URL}/destination/search/getTourBySearch?city=${city}&country=${country}&maxPeople=${maxPeople}`
    );

    if (!res.ok) alert("Something went wrong");
    const result = await res.json();

    navigate(
      `/tours/search?city=${city}&country=${country}&maxPeople=${maxPeople}`,
      { state: result.data }
    );
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>City</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={cityRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Country</h6>
              <input type="text" placeholder="Country" ref={countryRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i class="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxPeopleRef} />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
