import db from '../db.js';

export async function userUpdateHandler(user) {
    try {
      const result = await db.query(`
        Update typer set username = $1, fname = $2, lname = $3, email = $4
        WHERE clerk_id = $5
      `, [
        user.username,
        user.first_name,
        user.last_name,
        user.email_addresses[0].email_address,
        user.id
      ]);
  
      if (result.rowCount === 1) {
        console.log('User updated successfully');
        return { success: true };
      } else {
        console.error('Update failed: no rows affected');
        return { success: false, error: 'No rows affected' };
      }
    } catch (error) {
      console.error('Database insertion error:', error);
      return { success: false, error: error.message };
    }
  }