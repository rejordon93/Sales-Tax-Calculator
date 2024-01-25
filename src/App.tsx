import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "semantic-ui-css/semantic.min.css";
import { Form, Input, Button, List, Container, Grid } from "semantic-ui-react";

interface Tracker {
  id: string;
  city: string;
  state: string;
  street: string;
  zip: string;
  taxRate: number;
}

const App: React.FC = () => {
  const [trackerData, setTrackerData] = useState<Tracker[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://sales-tax-calculator.p.rapidapi.com/rates",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "3d5822144bmshfec578309f2bf43p1c3897jsn8cbd24c5a17f",
        "X-RapidAPI-Host": "sales-tax-calculator.p.rapidapi.com",
      },
      data: {
        city: city,
        state: state,
        street: street,
        zip: zip,
      },
    };

    try {
      const response = await axios.request(options);

      const tracker: Tracker = {
        id: uuidv4(),
        city: city,
        state: state,
        street: street,
        zip: zip,
        taxRate: response.data.tax_rate,
      };

      setTrackerData([...trackerData, tracker]);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    // Clear form fields after submission
    setCity("");
    setState("");
    setStreet("");
    setZip("");
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Grid centered columns={2}>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>City</label>
              <Input
                placeholder="Enter a city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <Input
                placeholder="Enter a state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Street</label>
              <Input
                placeholder="Enter a street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Zip</label>
              <Input
                placeholder="Enter a zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Field>
            <Button type="submit" color="teal" fluid>
              Click
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
      <List divided relaxed style={{ marginTop: "20px" }}>
        {trackerData.map((tracker) => (
          <List.Item
            key={tracker.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            <List.Content>
              <List.Header style={{ fontSize: "18px", fontWeight: "bold" }}>
                City: {tracker.city}, State: {tracker.state}, Street:{" "}
                {tracker.street}, Zip: {tracker.zip}, Tax Rate:{" "}
                {tracker.taxRate}%
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default App;
