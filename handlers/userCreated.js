import db from '../db.js';

export async function userCreatedHandler(user) {
    try {
      const result = await db.query(`
        INSERT INTO typer (clerk_id, username, fname, lname, goal, email)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        user.id,
        user.username,
        user.first_name,
        user.last_name,
        "Default Goal",
        user.email_addresses[0].email_address
      ]);
  
      if (result.rowCount === 1) {
        console.log('User inserted successfully');
        return { success: true };
      } else {
        console.error('Insertion failed: no rows affected');
        return { success: false, error: 'No rows affected' };
      }
    } catch (error) {
      console.error('Database insertion error:', error);
      return { success: false, error: error.message };
    }
  }
