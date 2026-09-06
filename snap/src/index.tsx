import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";
import { unavailableView, checkRecipient, resultToView } from "./insight.js";

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {
  const address = typeof transaction?.to === "string" ? transaction.to : "";
  const view = /^0x[a-fA-F0-9]{40}$/.test(address)
    ? resultToView(await checkRecipient(address, chainId), address)
    : unavailableView("This transaction has no recipient address AskLens can check.");

  return {
    content: (
      <Box>
        <Heading>{view.title}</Heading>
        <Text>{view.message}</Text>
        <Text>{view.detail}</Text>
      </Box>
    ),
  };
};
