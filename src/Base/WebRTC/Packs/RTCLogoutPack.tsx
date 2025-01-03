
export async function RTCLogoutPack(connection: any) {
  const { userAuthID, data } = useDataStore();
  const RTCLogoutPack = JSON.stringify({
    username: data.UserName,
    userauthid: userAuthID,
    type: 2
  });
  return RTCLogoutPack;
}