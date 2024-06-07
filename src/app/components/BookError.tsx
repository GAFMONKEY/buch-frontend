import {
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

interface BookErrorProps {
  responseStatus?: number | null;
}

export default function BookError({ responseStatus }: BookErrorProps) {
  if (!responseStatus) return null; // Return null to avoid rendering an empty div

  let alertTitle = '';
  let alertDescription = '';

  switch (responseStatus) {
    case 403:
      alertTitle = 'Sie sind nicht angemeldet';
      alertDescription =
        'Bitte melden Sie sich zuerst an. Vorher kann kein neues Buch angelegt werden.';
      break;

    case 422:
      alertTitle = 'Das Buch existiert bereits';
      alertDescription = 'Es existiert bereits ein Buch mit dieser ISBN.';
      break;

    case 500:
      alertTitle = 'Der Server ist nicht erreichbar';
      alertDescription =
        'Bitte versuchen Sie es später noch einmal. Vielen Dank';
      break;

    default:
      // Optional: Handle other statuses or default case
      alertTitle = 'Unbekannter Fehler';
      alertDescription = 'Es ist ein unbekannter Fehler aufgetreten.';
      break;
  }

  return (
    <Flex align="center" justify="center" my={4}>
      <Alert status="error" flexDirection="column" textAlign="center">
        <AlertIcon />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </Alert>
    </Flex>
  );
}
