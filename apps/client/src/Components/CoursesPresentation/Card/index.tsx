import React, { FC } from "react";
import { Container, CardContainer, MainText, CardImage } from "./styles";
import { CoursePresentation } from "Api/CoursePresentation";
import { format } from 'date-fns';

interface DisplayProps {
  courses: CoursePresentation[];
  screenWidth: number;
}

const Card: FC<DisplayProps> = ({ courses, screenWidth }): JSX.Element => {
  return (
    <Container>
      {courses?.map((item, index) => {
        // Show only two cards if it's a mobile screen
        if (screenWidth < 1024 && index > 1) {
          return <React.Fragment key={index} />;
        } else {
          return (
            <React.Fragment key={index}>
              <CardContainer>
                <CardImage
                  src={item?.banner_image?.url}
                  alt={item?.banner_image?.name}
                />
                <MainText>
                  <p>{item?.title}</p>
                  <p>{format(item?.date, 'DD-MM-YYYY').replaceAll('-', '/')}</p>
                </MainText>
                <p>{item?.description}</p>
              </CardContainer>
            </React.Fragment>
          );
        }
      })}
    </Container>
  );
};

export default Card;