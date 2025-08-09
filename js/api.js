async function getPincodeDetails(pincode) {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPostOfficeDetails(name) {
  try {
    const res = await fetch(`https://api.postalpincode.in/postoffice/${name}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
