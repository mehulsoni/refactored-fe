import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AccountProps } from "../../Components/Type";
import { BOX, SIGN } from "../../Constants/WalletConstant";

const Profile = ({ setSelectedAction, account }: AccountProps) => {
  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    const [profileObject] = await Promise.all([BOX.getProfile(account)]);
    console.log(profileObject);
    setProfile(profileObject);
    return profileObject;
  };
  useEffect(() => {
    getProfile();
  }, []);

  const back = () => {
    setSelectedAction(SIGN);
  };

  return (
    <>
      <Container>
        <h4>Box Profile</h4>
        <Row>
          <Col sm={4}>
            <p>Name: {JSON.parse(JSON.stringify(profile, null, 4)).name}</p>
            <p>
              Description:{" "}
              {JSON.parse(JSON.stringify(profile, null, 4)).description}
            </p>
            <p>
              Employer: {JSON.parse(JSON.stringify(profile, null, 4)).employer}
            </p>
            <p>Job: {JSON.parse(JSON.stringify(profile, null, 4)).job}</p>
            <p>
              Location: {JSON.parse(JSON.stringify(profile, null, 4)).location}
            </p>
          </Col>
          <Col sm={6}>
            <p>
              Member Since:{" "}
              {JSON.parse(JSON.stringify(profile, null, 4)).memberSince}
            </p>
            <p>
              Proof DID:{" "}
              {JSON.parse(JSON.stringify(profile, null, 4)).proof_did}
            </p>
          </Col>
        </Row>
        <br />
        <Button onClick={() => back()} variant="primary" type="button">
          Return
        </Button>
      </Container>
    </>
  );
};

export default Profile;
