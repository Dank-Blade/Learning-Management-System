import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const ImageCard = ({ contentDetails, contentId }) => {
  
  const downloadFile = () => {
    if (contentDetails.length > 0) {
      window.open(`http://127.0.0.1:8000/file/content/${contentId}`, "_blank");
    }
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      cursor={"pointer"}
      onClick={() => {
        downloadFile();
      }}
    >
      {/* <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      /> */}

      <Stack>
        <CardBody>
          <Heading size="md">
            {contentDetails.length !== 0
              ? contentDetails[0]?.file.split("/")[5]
              : ""}
          </Heading>
        </CardBody>

        <CardFooter></CardFooter>
      </Stack>
    </Card>
  );
};

export default ImageCard;
