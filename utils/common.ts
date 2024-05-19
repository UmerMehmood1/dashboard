import { NextResponse } from "next/server";

type ApiResponse<T> = {
  data?: T;
  message?: string;
};

export function sendResponse<T>(
  statusCode: number,
  content: ApiResponse<T>
): NextResponse {
  return new NextResponse(JSON.stringify(content), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
