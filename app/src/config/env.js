const vars = import.meta.env

export const env = {
  sling: {
    address: vars.VITE_SLING_CONTRACT_ADDRESS,
  },
}
