import db from '../db.js';

export async function userDeletedHandler(user) {
    try {
      console.log('Attempting to delete user with ID:', user.id);
      const result = await db.query(`
        DELETE FROM typer WHERE clerk_id = $1
      `, [
        user.id,
      ]);
  
      if (result.rowCount === 1) {
        console.log(`User ${user.id} deleted successfully from database`);
        return { success: true };
      } else {
        console.error(`Deletion failed: no rows affected for user ID ${user.id}`);
        return { success: false, error: 'No rows affected' };
      }
    } catch (error) {
      console.error('Database deletion error:', error);
      console.error('Failed user data:', user);
      return { success: false, error: error.message };
    }
  }
