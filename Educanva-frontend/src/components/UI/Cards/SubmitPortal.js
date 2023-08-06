import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import useInput from "../../../hooks/useInput";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import ImageSubmitCard from "./ImageSubmitCard";

let file = null;

const SubmitPortal = ({dueDate, dueTime}) => {
  const params = useParams();
  const id = params.id;
  const assignmentId = params.assignmentId;

  const data = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access);
  const user_id = data.id;
  const fileInput = useInput((value) => value !== null);

  const [assignmentDetails, setAssignmentDetails] = useState([]);

  const [resubmission, setResubmission] = useState(false);
  const [isPastDue, setIsPastDue] = useState(false);

  const fileInputRef = useRef(null);

  const toast = useToast();

  const fileChangeHandler = (event) => {
    file = event.target.files[0];
  };

  useEffect(() => {
    fetchSubmission();
  }, [resubmission]);

  const fetchSubmission = () => {
    fetch(`http://127.0.0.1:8000/file/submission/list/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignmentDetails(data);
      })
      .catch((error) => console.error(error));
  };

  const filteredAssignmentDetails = assignmentDetails.filter(
    (item) => item.assignment_id === parseInt(assignmentId) && item.uploaded_by === user_id
  );

  const submissionId = filteredAssignmentDetails.map((item) => item.id)[0];

  const formIsValid = fileInput.isValid;

  const submitHandler = (e) => {
    e.preventDefault();

    if (filteredAssignmentDetails.length === 0) {
      const formData = new FormData();

      const newData = {
        file: file,
        module: id,
        uploaded_by: user_id,
        assignment_id: assignmentId,
      };

      if (formIsValid) {
        formData.append("file", newData.file);
        formData.append("module", newData.module);
        formData.append("uploaded_by", newData.uploaded_by);
        formData.append("assignment_id", newData.assignment_id);
      }

      fetch(`http://127.0.0.1:8000/file/submission/upload/`, {
        method: "POST",
        body: formData,

        headers: {
          // "Content-Type": "multipart/form-data",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("tokens")).access
          }`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fileInput.reset();
          setResubmission(true);
        })
        .catch((error) => console.error(error));
        toast({
          title: "Assignment submitted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    } else {
      const formData = new FormData();

      const newData = {
        file: file,
      };

      if (formIsValid) {
        formData.append("file", newData.file);
      }

      fetch(`http://127.0.0.1:8000/file/submission/update/${submissionId}/`, {
        method: "PUT",
        body: formData,

        headers: {
          // "Content-Type": "multipart/form-data",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("tokens")).access
          }`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fileInput.reset();
          setResubmission(true);
        })
        .catch((error) => console.error(error));
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input value
      }
    }
    toast({
      title: "Assignment submitted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setResubmission(false);
  };

  useEffect(() => {
    const currentDateTime = new Date();
    const dueDateTime = new Date(`${dueDate} ${dueTime}`);
    setIsPastDue(currentDateTime >= dueDateTime);
  }, [dueDate, dueTime]);

  return (
    <Card
      width={"320px"}
      boxShadow={"md"}
      as={"form"}
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <CardHeader>
        <Heading size="md">Your Work</Heading>
        <ImageSubmitCard
          submissionDetails={filteredAssignmentDetails}
          submissionId={submissionId}
        />
      </CardHeader>
      <CardBody>
        <Input
          width={"full"}
          type={"file"}
          onChange={fileChangeHandler}
          ref={fileInputRef}
        />
      </CardBody>
      <CardFooter>
        <Button width={"full"} type={"submit"} disabled={isPastDue}>
          {filteredAssignmentDetails.length === 0 ? "Submit" : "Resubmit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitPortal;
