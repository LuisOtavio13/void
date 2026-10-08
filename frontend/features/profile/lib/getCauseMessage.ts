function getCauseMessage(error: Error): string {
  
  if (!error.cause) {
    return "Nenhuma causa especificada.";
  }

  
  if (error.cause instanceof Error) {
    return error.cause.message;
  }

  
  if (
    typeof error.cause === "object" && 
    error.cause !== null && 
    "message" in error.cause && 
    typeof (error.cause as any).message === "string"
  ) {
    return (error.cause as { message: string }).message;
  }

  
  if (typeof error.cause === "string" || typeof error.cause === "number") {
    return String(error.cause);
  }

  
  try {
    return JSON.stringify(error.cause);
  } catch {
    return String(error.cause);
  }
}
