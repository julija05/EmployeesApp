import axios from 'axios';

export async function fetchShifts($route="/api/shiftsByTotalPay", total_pay = 0, page=1) {
  try {
    const response = await axios.get($route, {
      params: {
        total_pay,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch activities');
  }
}