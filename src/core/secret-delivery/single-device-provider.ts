import { SingleDeviceRevealLoop } from "@/components/secret-delivery/SingleDeviceRevealLoop";

import type { SecretDeliveryProvider } from "./types";

export const singleDeviceProvider: SecretDeliveryProvider = {
  mode: "single-device",
  RevealLoop: SingleDeviceRevealLoop,
};
