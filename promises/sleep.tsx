// basic promise with out error handling
async function sleep1(millis: number): Promise<void> {
  const test = await new Promise<void>((resolve, reject) =>
    setTimeout(resolve, millis)
  );

  return;
}

// promise with more error handling
async function sleep2(millis: number): Promise<void> {
  const test = await new Promise<void>((resolve, reject) => {
    try {
      setTimeout(resolve, millis);
    } catch (err) {
      reject(err);
    }
  });

  return;
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
